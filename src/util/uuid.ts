const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export default function uuid(): string {
  let uuid = "";

  for (let index = 0; index < 32; index++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    uuid += characters.charAt(randomIndex);
  }

  return uuid;
}
