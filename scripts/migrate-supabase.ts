import { readFileSync, readdirSync } from "fs";
import { join } from "path";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  console.error("❌ NEXT_PUBLIC_SUPABASE_URL не задан");
  process.exit(1);
}

if (!supabaseServiceKey) {
  console.error(
    "❌ SUPABASE_SERVICE_ROLE_KEY не задан (нужен для выполнения миграций)"
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { persistSession: false },
});

const MIGRATIONS_DIR = join(__dirname, "..", "supabase", "migrations");

async function migrate() {
  console.log("🔧 Запуск Supabase SQL-миграций...\n");

  const files = readdirSync(MIGRATIONS_DIR)
    .filter((f) => f.endsWith(".sql"))
    .sort();

  if (files.length === 0) {
    console.log("  Нет SQL-файлов миграций.");
    return;
  }

  for (const file of files) {
    const filePath = join(MIGRATIONS_DIR, file);
    console.log(`  Выполнение: ${file}...`);

    try {
      const sql = readFileSync(filePath, "utf-8");

      const { error } = await supabase.rpc("exec_sql", { query: sql });

      if (error) {
        if (error.message.includes('function "exec_sql" does not exist')) {
          console.log(
            "  ⚠ Функция exec_sql недоступна. Установите её вручную через SQL Editor в Supabase:\n"
          );
          console.log(
            "    CREATE OR REPLACE FUNCTION exec_sql(query text)\n" +
              "    RETURNS void AS $$\n" +
              "    BEGIN\n" +
              "      EXECUTE query;\n" +
              "    END;\n" +
              "    $$ LANGUAGE plpgsql SECURITY DEFINER;\n"
          );
          console.log("  Затем запустите миграцию снова.\n");
          console.log(`  Содержимое ${file} для ручного выполнения:\n`);
          console.log(sql);
          console.log("\n---\n");
          continue;
        }

        console.error(`  ❌ Ошибка в ${file}: ${error.message}`);
        process.exit(1);
      }

      console.log(`  ✓ ${file} — успешно`);
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      console.error(`  ❌ Ошибка при выполнении ${file}: ${message}`);
      process.exit(1);
    }
  }

  console.log("\n🎉 Supabase миграции завершены!");
}

migrate();
