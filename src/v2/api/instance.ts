import axios from "axios";

const instance = axios.create({
  baseURL: "https://pre-onboarding-selection-task.shop/",
  timeout: 3000,
});

export { instance };
