import { config } from 'dotenv';
import Joi from 'joi';

export const configEnvironment = () => {
  // Load environment variables from .env file
  config();

  // Define a Joi schema for environment variable validation
  const envSchema = Joi.object({
    NODE_ENV: Joi.string()
      .valid('development', 'production', 'test')
      .default('development'),
    OPENAI_API_KEY: Joi.string().required(),
  }).unknown(); // Allow additional environment variables not defined in the schema

  // Validate the process.env object against the schema
  const { error } = envSchema.validate(process.env, {
    abortEarly: false,
  });

  if (error) throw new Error(`Environment validation error: ${error.message}`);
};
