// Blog.test.js

import Blog from './Blog';
import { MemoryRouter } from 'react-router-dom';
import useBlogs from '../../Components/Hooks/useBlogs';

jest.mock('../../Components/Hooks/useBlogs');

const mockBlogs = [
  { _id: '1', blogTitle: 'Blog 1', blogPublishDate: '2023-01-01' },
  { _id: '2', blogTitle: 'Blog 2', blogPublishDate: '2023-01-02' },
];

beforeEach(() => {
  useBlogs.mockReturnValue([mockBlogs]);
});

describe('Blog Component', () => {
  test('renders blogs correctly', () => {
    render(
      <MemoryRouter>
        <Blog />
      </MemoryRouter>
    );

    mockBlogs.forEach((blog) => {
      expect(screen.getByText(blog.blogTitle)).toBeInTheDocument();
      expect(screen.getByText(blog.blogPublishDate)).toBeInTheDocument();
    });
  });
});
