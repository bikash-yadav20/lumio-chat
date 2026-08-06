const z = require("zod");

const UserSchema = z.object({
  profile_picture: z.string().url().optional(),
  full_name: z.string().min(5).max(50),
  user_name: z.string().min(5).max(100),
  email: z.string().email().max(100),
  password: z.string().min(8).max(200),
  is_online: z.boolean().optional(),
  last_seen: z.string().datetime().optional(),
});

module.exports = UserSchema;
