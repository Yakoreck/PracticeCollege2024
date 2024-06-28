import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

class Comment extends Model {
  public id!: number;
  public userId!: number;
  public productId!: number;
  public description!: string;
}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "comments",
  }
);

export default Comment;
