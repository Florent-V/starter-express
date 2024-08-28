export const send = (req, res) => {
  if (res.data) {
    res.json(res.data);
  } else {
    res.status(204).send()
  };
}