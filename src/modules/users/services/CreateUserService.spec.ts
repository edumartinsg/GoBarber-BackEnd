import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const user = await createUser.execute({
      email: 'craudio@hotmail.com',
      password: '38273',
      name: 'Claudio',
    });
    expect(user).toHaveProperty('id');
  });
  it('should not be able to create a new user with the same email as another one ', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    await createUser.execute({
      email: 'craudio@hotmail.com',
      password: '38273',
      name: 'Claudio',
    });
    expect(
      createUser.execute({
        email: 'craudio@hotmail.com',
        password: '38273',
        name: 'Claudio',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
