import { authClient } from "./auth-client";

const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;

export const fetchDashboardStats = async (): Promise<any> => {
  const { data: token } = await authClient.token();

  const res = await fetch(`${baseURL}/api/dashboard/stats`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token?.token}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch dashboard stats: ${res.statusText}`);
  }

  return res.json();
};

// --- ImgBB Image Upload Function ---
export const uploadImageToImgBB = async (imageFile: File): Promise<string> => {
  const formData = new FormData();
  formData.append("image", imageFile);

  const imgbbKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY; // .env.local এ রাখবে
  const res = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) throw new Error("Image upload failed");
  return data.data.url; // Returns the uploaded image link
};

// --- Task 6: Fetch All Courses (Public) ---
export const fetchExploreCourses = async (queryParams = "") => {
  const res = await fetch(`${baseURL}/api/courses?${queryParams}`);
  if (!res.ok) throw new Error("Failed to fetch courses");
  return res.json();
};

// --- Task 5: Fetch Single Course Details (Public) ---
export const fetchCourseDetails = async (id: string) => {
  const res = await fetch(`${baseURL}/api/courses/${id}`);
  if (!res.ok) throw new Error("Course details not found");
  return res.json();
};

// --- Task 8: Add New Course (Protected) ---
export const addCourse = async (courseData: any) => {
  const { data: token } = await authClient.token();

  const res = await fetch(`${baseURL}/api/courses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token?.token}`,
    },
    body: JSON.stringify(courseData),
  });

  const result = await res.json();

  console.log("ADD COURSE STATUS:", res.status);
  console.log("ADD COURSE RESPONSE:", result);

  if (!res.ok) {
    throw new Error(result.msg || "Failed to add course");
  }

  return result;
};

// --- Task 9: Fetch My Courses for Manage Page (Protected) ---
export const fetchMyCourses = async () => {
  const { data: token } = await authClient.token();

  console.log("MY TOKEN:", token);

  const res = await fetch(`${baseURL}/api/manage-courses`, {
    headers: {
      authorization: `Bearer ${token?.token}`,
    },
  });

  const data = await res.json();

  console.log("STATUS:", res.status);
  console.log("RESPONSE:", data);

  if (!res.ok) {
    throw new Error(data.msg || "Failed to fetch your courses");
  }

  return data;
};

// --- Task 9: Delete Course (Protected) ---
export const deleteCourse = async (id: string) => {
  const { data: token } = await authClient.token();

  const res = await fetch(`${baseURL}/api/courses/${id}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token?.token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to delete course");
  return res.json();
};

// ─────────────────────────────────────────────
// ENROLL IN COURSE
// ─────────────────────────────────────────────

export const enrollInCourse = async (courseId: string) => {
  const { data: token } = await authClient.token();

  const res = await fetch(`${baseURL}/api/enrollments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token?.token}`,
    },
    body: JSON.stringify({ courseId }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.msg || "Failed to enroll in course");
  }

  return data;
};

// ─────────────────────────────────────────────
// FETCH MY COURSES
// ─────────────────────────────────────────────

export const fetchMyEnrolledCourses = async () => {
  const { data: token } = await authClient.token();

  const res = await fetch(`${baseURL}/api/my-courses`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token?.token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch enrolled courses");
  }

  return res.json();
};



export const fetchMyEnrolled = async () => {
  const { data: token } = await authClient.token();

  const res = await fetch(`${baseURL}/api/enrollments/my-courses`, {
    headers: {
      authorization: `Bearer ${token?.token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.msg || "Failed to fetch enrolled courses");
  }

  return data;
};