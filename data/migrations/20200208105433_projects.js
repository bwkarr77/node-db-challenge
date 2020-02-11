exports.up = function(knex) {
  return knex.schema
    .createTable("projects", projects => {
      projects.increments("project_id");
      projects
        .string("project_name", 150)
        .notNullable()
        .unique();
      projects.string("project_desc", 200);
      projects.boolean("project_completed").defaultTo(false);
    })
    .createTable("tasks", tasks => {
      tasks.increments("task_id");
      tasks
        .string("task_desc", 150)
        .notNullable()
        .unique();
      tasks.string("task_note", 200);
      tasks.boolean("task_completed").defaultTo(false);
      tasks
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references("project_id")
        .inTable("projects")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("resources", resource => {
      resource.increments("resource_id");
      resource
        .string("resource_name", 150)
        .notNullable()
        .unique();
      resource.string("resource_desc", 200);
    })
    .createTable("project_resources", table => {
      table
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references("project_id")
        .inTable("projects")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("resource_id")
        .unsigned()
        .notNullable()
        .references("resource_id")
        .inTable("resources")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.integer("quantity").notNullable();
      table.primary(["project_id", "resource_id"]);
    })
    .createTable("project_tasks", table => {
      table
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references("project_id")
        .inTable("projects")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("task_id")
        .unsigned()
        .notNullable()
        .references("task_id")
        .inTable("tasks")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.primary(["project_id", "task_id"]);
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("project_tasks")
    .dropTableIfExists("project_resources")
    .dropTableIfExists("resources")
    .dropTableIfExists("tasks")
    .dropTableIfExists("projects");
};
