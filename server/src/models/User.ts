import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";
import bcrypt from "bcryptjs";
import Comment from "./Comment";
import Order from "./Order";

class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public role!: "admin" | "user"; 

  public async matchPassword(enteredPassword: string): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, this.password);
  }

  static initialize() {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        role: {
          // Додано стовпець ролі користувача
          type: DataTypes.ENUM("admin", "user"),
          allowNull: false,
          defaultValue: "user", 
        },
      },
      {
        sequelize,
        tableName: "users",
      }
    );
  }

 
  public comments!: Comment[];
}

User.initialize();


User.hasMany(Comment, { foreignKey: "userId" });
Comment.belongsTo(User, { foreignKey: "userId" });

export default User;
