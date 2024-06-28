import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";
import Comment from "./Comment"; 

class Product extends Model {
  public id!: number;
  public name!: string;
  public price!: number;
  public description!: string;
  public imageUrl!: string;
  public category!: string; 

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public comments!: Comment[];
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    category: {
      
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "products",
  }
);


Product.hasMany(Comment, { foreignKey: "productId", as: "comments" });
Comment.belongsTo(Product, { foreignKey: "productId" });

export default Product;
