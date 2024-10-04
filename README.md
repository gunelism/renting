How to run the app:

1. Run `npm i` command
2. Setup database settings inside `data-source.ts` file
3. Run `docker compose up`, postgres and rabbitmq are running on docker
4. Connect to postgres and create db `renting`, db related info can be found in `.src/data-source.ts`
5. Run `npm run start:dev` command

More to be done in the app:

- Return types of methods
- Response types of methods
- Developing unit/integration tests
- Adding logger
- Pagination
- Better structure: to make dir for each service and keep controller, route and service files within their own directory. (invoice/_, booking/_, room/\*)
- good practice for sending email is using queue mechanism like RabbitMQ/Kafka. Before finishing booking creation we should send email message to queue. A listener will wait for queue messages and will send the email. this will allow user to receive "booking created" message, and BE will handle the load so user would not wait.
