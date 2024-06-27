export const formatedBook = (book) => {
  const { _id, ...otherFields } = book.toObject();
  return { id: _id, ...otherFields };
};
