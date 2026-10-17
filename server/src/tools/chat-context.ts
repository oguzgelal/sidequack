import type { ActivePerson } from "../services/person.service.js";

export type ChatContext = {
  person: ActivePerson;
};
