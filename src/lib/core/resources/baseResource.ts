import { Client } from "../request";

export class BaseResource {
  public client: Client;

  constructor(client: Client) {
    this.client = client;
  }
}
