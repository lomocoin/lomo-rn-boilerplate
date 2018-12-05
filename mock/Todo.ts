import { Column, Entity } from 'parrot';

@Entity(10)
export default class Todo {
  @Column({
    type: 'string',
    limit: [2, 200],
  })
  title!: string;

  @Column({
    type: 'bool',
  })
  checked!: boolean;
}
