import React, { useEffect, useState } from "react";
import useBooksStore from "../store/library";
import { Input, Button, List, Modal, Form } from "antd";
import { useNavigate } from "react-router-dom";

const BooksList = () => {
  const navigate = useNavigate();
  const { books, fetchBooks, addBook, updateBook, deleteBook } =
    useBooksStore();
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchBooks();
  }, []);

  const showModal = (book = null) => {
    setCurrentBook(book);
    setModalVisible(true);
    form.setFieldsValue(
      book || { title: "", author: "", genre: "", published_year: "" }
    );
  };

  const showDeleteModal = (book) => {
    setCurrentBook(book);
    setDeleteModalVisible(true);
  };

  const handleSubmit = async () => {
    const values = await form.validateFields();
    if (currentBook) {
      updateBook(currentBook.id, values);
    } else {
      addBook(values);
    }
    setModalVisible(false);
    form.resetFields();
  };

  const handleDelete = () => {
    deleteBook(currentBook.id);
    setDeleteModalVisible(false);
  };

  return (
    <div>
      <Button type="primary" onClick={() => showModal()}>
        Добавить книгу
      </Button>
      <h2 className="text-[32px]">Список книг</h2>
      <List
        dataSource={books}
        renderItem={(book) => (
          <List.Item
            actions={[
              <Button onClick={() => showModal(book)}>Редактировать</Button>,
              <Button danger onClick={() => showDeleteModal(book)}>
                Удалить
              </Button>,
              <Button
                type="link"
                onClick={() => navigate(`/main/library/${book.id}`)}
              >
                Подробнее
              </Button>,
            ]}
          >
            {book.title} ({book.author})
          </List.Item>
        )}
      />

      <Modal
        title={currentBook ? "Редактирование книги" : "Добавление книги"}
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={handleSubmit}
      >
        <Form form={form}>
          <Form.Item
            name="title"
            label="Название книги"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="author" label="Автор" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="genre" label="Жанр">
            <Input />
          </Form.Item>
          <Form.Item name="published_year" label="Год публикации">
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Удаление книги"
        visible={deleteModalVisible}
        onCancel={() => setDeleteModalVisible(false)}
        onOk={handleDelete}
      >
        <p>Вы уверены, что хотите удалить книгу "{currentBook?.title}"?</p>
      </Modal>
    </div>
  );
};

export default BooksList;
