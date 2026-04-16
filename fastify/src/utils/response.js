
export const handleResponse = (reply, status, message, data = null) => {
  reply.status(status).send({
    status,
    message,
    data
  });
};