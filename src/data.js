export const user = { name: "User ", email: "", password: "12345678", role: "" };

export const usersList = Array.from({ length: 100 }).map((_, i) => ({
  password: user.password,
  name: user.name + i,
  email: `user${i}@gmail.com`,
  role: i % 5 === 0 ? "operator" : i % 2 === 0 ? "user" : "admin",
}));
