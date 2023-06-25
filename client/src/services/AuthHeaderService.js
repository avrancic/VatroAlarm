export default function authHeader() {
  let jwl = localStorage.getItem('jwl');

  console.log(jwl)

  if (jwl) {
    return { };
  } else {
    return {};
  }
}