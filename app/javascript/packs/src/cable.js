import { createConsumer } from "@rails/actioncable";
const URL = "ws://jp-neighborhood-aid.herokuapp.com/cable";
const consumer = createConsumer(URL);

export default consumer;
