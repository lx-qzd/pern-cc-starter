import { pgTable, serial, text } from 'drizzle-orm/pg-core';

export const cars = pgTable('cars', {
  id: serial('id').primaryKey(),
  name: text('name'),
  brand: text('brand'),
  year: integer('year'),
});