import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Blog from "./Blog";
import useBlogs from "../../Components/Hooks/useBlogs";
import useAxiosPublic from "../../Components/Hooks/useAxiosPublic";
import ReactPaginate from "react-paginate";

jest.mock("../../Components/Hooks/useBlogs");
jest.mock("../../Components/Hooks/useAxiosPublic"); // Mock useAxiosPublic
jest.mock("react-paginate", () => {
  return ({ onPageChange }) => (
    <div>
      <button onClick={() => onPageChange({ selected: 1 })}>Next</button>
    </div>
  );
});

describe("Blog Component", () => {
  const mockBlogs = [
    { _id: "1", blogTitle: "Blog 1", blogPublishDate: "2023-01-01", blogComments: [], blogDescription: "Description 1", blogImage: "img1.jpg" },
    { _id: "2", blogTitle: "Blog 2", blogPublishDate: "2023-01-02", blogComments: [], blogDescription: "Description 2", blogImage: "img2.jpg" },
    { _id: "3", blogTitle: "Blog 3", blogPublishDate: "2023-01-03", blogComments: [], blogDescription: "Description 3", blogImage: "img3.jpg" },
    { _id: "4", blogTitle: "Blog 4", blogPublishDate: "2023-01-04", blogComments: [], blogDescription: "Description 4", blogImage: "img4.jpg" },
    { _id: "5", blogTitle: "Blog 5", blogPublishDate: "2023-01-05", blogComments: [], blogDescription: "Description 5", blogImage: "img5.jpg" },
  ];

  beforeEach(() => {
    useBlogs.mockReturnValue([mockBlogs]);
    useAxiosPublic.mockReturnValue({}); // Return an empty object for axios mock
  });

  it("renders blogs correctly", () => {
    render(
      <MemoryRouter>
        <Blog />
      </MemoryRouter>
    );

    mockBlogs.slice(0, 4).forEach((blog) => {
      expect(screen.getByText(blog.blogTitle)).toBeInTheDocument();
      expect(screen.getByText(blog.blogPublishDate)).toBeInTheDocument();
    });
  });

  it("paginates correctly when Next button is clicked", () => {
    render(
      <MemoryRouter>
        <Blog />
      </MemoryRouter>
    );

    mockBlogs.slice(0, 4).forEach((blog) => {
      expect(screen.getByText(blog.blogTitle)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Next"));

    expect(screen.getByText("Blog 5")).toBeInTheDocument();
  });
});
