import { FakeHashProvider } from '../providers/HashProvider/fakes/FakeHashProvider';
import { FakeUsersRepository } from '../repositories/fakes/FakeUsersRepository';
import { CreateUsersService } from './CreateUsersService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUsersService;

describe('Create User', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUserService = new CreateUsersService(
      fakeUsersRepository,
      fakeHashProvider
    );
  });

  it('should be able to create a new user', async () => {
    const user = await createUserService.execute({
      name: 'David Gilmour',
      email: 'davidgilmour@pinkfloyd.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });
});
