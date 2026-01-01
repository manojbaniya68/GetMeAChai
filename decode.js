// decodeSession.js
import { decode } from "next-auth/jwt";

const token = "eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..U6eUUykjesTfloZo.2peA5Ttby6qdMOWCsgwaSkOP8ZeZlS-jX7vBLmqsWOBa4yiLfySdVsfou3Mx5JQtypP0kYuQcuG2_onEvsNGyPiwvcZb1iMBkQFQYL8YXrXZim2TTNU0PNyHGccH5OgyG2ahsqMH3HW7yxeZSLj8S5jLVJBR_3in6zQZHIFKzOcBJl1JdlyRSPrK3huT6s0S_mE5teBQi-Y5jRUYwEIH7PQFr-waazNgQAhoC9WMN7KFJgNNmJ-bGr5YQfB8TtRZsog6JL2u24smVdTRb0PqO5D-BtDLMe8NCkmSxZynGNLfNItsy7oRsUzPjYGWtAwjUM0CgiqSP6vKqQ.HxXcoJ5EUYp1CAWvev_vWg";

async function decodeToken() {
  const secret = "8234jfhds8f7sd7f89sdf7908sdf7098sd7f"; // your NEXTAUTH_SECRET
  const session = await decode({ token, secret });
  console.log(session);
}

decodeToken();
