import { Column, Entity } from 'parrot';

@Entity(1)
export default class User {
  @Column({
    type: 'string',
    limit: [6, 20],
  })
  username!: string;

  @Column({
    type: 'string',
    limit: [6, 20],
  })
  password!: string;

  @Column({
    type: 'string',
    limit: [6, 100],
  })
  avatar!: string;
}
