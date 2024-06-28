import React, { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Row,
  Col,
  Card,
  Typography,
  Space,
  message,
} from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import {
  CreateProductData,
  UpdateProductData,
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "../../api/product";
import { useMutation, useQuery } from "@tanstack/react-query";

const { Title } = Typography;

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string | null;
  category: string;
  createdAt: string;
  updatedAt: string;
}

const ManageProducts: React.FC = () => {
  const { data: productResponses, refetch } = useQuery({
    queryKey: ["all products"],
    queryFn: () => getAllProducts(),
  });

  const { mutate: createProductMutate } = useMutation({
    mutationFn: (data: CreateProductData) => createProduct(data),
    onSuccess: () => {
      message.success("Створено");
      refetch();
    },
  });

  const { mutate: deleteOrderMutate } = useMutation({
    mutationFn: (id: number) => deleteProduct(id),
    onSuccess: () => {
      message.success("Видалено");
      refetch();
    },
  });

  const { mutate: updateProductMutate } = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateProductData }) =>
      updateProduct(id, data),
    onSuccess: () => {
      message.success("Оновлено");
      refetch();
    },
  });

  const products: Product[] =
    productResponses?.map((response) => ({
      id: response.id,
      name: response.name,
      price: response.price,
      description: response.description,
      imageUrl: response.imageUrl,
      category: response.category,
      createdAt: response.createdAt,
      updatedAt: response.updatedAt,
    })) || [];

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form] = Form.useForm();

  const handleAddProduct = () => {
    setEditingProduct(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    form.setFieldsValue(product);
    setIsModalVisible(true);
  };

  const handleDeleteProduct = async (id: number) => {
    await deleteOrderMutate(id);
    refetch();
  };

  const handleModalOk = async () => {
    form
      .validateFields()
      .then(async (values) => {
        form.resetFields();
        if (editingProduct) {
          await updateProductMutate({ id: editingProduct.id, data: values });
        } else {
          await createProductMutate(values);
        }
        refetch();
        setIsModalVisible(false);
      })
      .catch((info) => {
        console.log("Помилка валідації:", info);
      });
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Зображення",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (imageUrl: string | null) =>
        imageUrl ? (
          <img src={imageUrl} alt="product" style={{ width: 50, height: 50 }} />
        ) : (
          "Немає зображення"
        ),
    },
    {
      title: "Назва",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ціна",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Категорія",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Опис",
      dataIndex: "description",
      key: "description",
      render: (description: string) => `${description.trim().substring(0, 20)}`,
    },
    {
      title: "Дії",
      key: "actions",
      render: (_: any, record: Product) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditProduct(record)}
          />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDeleteProduct(record.id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <Row justify="center" style={{ marginTop: 20 }}>
      <Col span={16}>
        <Card>
          <Row
            justify="space-between"
            align="middle"
            style={{ marginBottom: 20 }}
          >
            <Col>
              <Title level={2}>Керування товарами</Title>
            </Col>
            <Col>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleAddProduct}
              >
                Додати товар
              </Button>
            </Col>
          </Row>
          <Table columns={columns} dataSource={products} rowKey="id" />
        </Card>
      </Col>
      <Modal
        title={editingProduct ? "Редагувати товар" : "Додати товар"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleModalOk}
        okText={editingProduct ? "Зберегти" : "Додати"}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={
            editingProduct || {
              name: "",
              price: 0,
              description: "",
              imageUrl: "",
              category: "",
            }
          }
        >
          <Form.Item
            name="name"
            label="Назва"
            rules={[
              {
                required: editingProduct ? false : true,
                message: "Будь ласка, введіть назву!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Ціна"
            rules={[
              {
                required: editingProduct ? false : true,
                message: "Будь ласка, введіть ціну!",
              },
            ]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="description"
            label="Опис"
            rules={[
              {
                required: editingProduct ? false : true,
                message: "Будь ласка, введіть опис!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="imageUrl"
            label="URL зображення"
            rules={[
              {
                required: false,
                message: "Будь ласка, введіть URL зображення!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="category"
            label="Категорія"
            rules={[
              {
                required: editingProduct ? false : true,
                message: "Будь ласка, виберіть категорію!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Row>
  );
};

export default ManageProducts;
