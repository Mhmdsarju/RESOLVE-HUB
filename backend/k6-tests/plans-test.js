import http from "k6/http";
import { Counter } from "k6/metrics";

const success = new Counter("successful_requests");
const rateLimited = new Counter("rate_limited_requests");
const otherResponses = new Counter("other_responses");

export const options = {
  vus: 10,
  duration: "1m",
};

export default function () {
  const response = http.get("https://api.resolvehub.in/plans");

  if (response.status === 200) {
    success.add(1);
  } else if (response.status === 429) {
    rateLimited.add(1);
  } else {
    otherResponses.add(1);
  }
}