import mongoose, { Connection, Model, Schema } from 'mongoose';

export class MongoDB {
  private connection: Connection | null = null;

  constructor(private uri: string) { }

  private async getConnection(): Promise<Connection> {
    if (!this.connection) {
      await mongoose.connect(this.uri);
      this.connection = mongoose.connection;

      this.connection.on('connected', () => {
        console.log('Connected to MongoDB');
      });

      this.connection.on('error', (err: Error) => {
        console.error('MongoDB connection error:', err);
      });
    }

    return this.connection;
  }

  public async getModel<T extends object>(
    name: string,
    schemaDefinition: Record<keyof T, any>
  ): Promise<Model<T>> {
    await this.getConnection();

    if (mongoose.models[name]) {
      return mongoose.models[name] as Model<T>;
    }

    const schema = new Schema<T>(schemaDefinition, {
      timestamps: true,
      versionKey: false,
    });

    return mongoose.model<T>(name, schema);
  }

  public async insertOne<T extends object>(
    model: Model<T>,
    document: T
  ): Promise<void> {
    await model.create(document);
  }

  public async find<T>(
    model: Model<T>,
    query: Partial<T> = {}
  ): Promise<T[]> {
    const results = await model.find(query);
    return results;
  }

  public async close(): Promise<void> {
    if (this.connection) {
      await mongoose.disconnect();
      this.connection = null;
      console.log('Mongoose connection closed');
    }
  }
}
