import React, { useState, useMemo } from "react";
import "./CourseList.css"; // Custom CSS file

const mockCourses = [
  {
    id: 1,
    title: "React for Beginners",
    category: "Web Development",
    difficulty: "Beginner",
    dateAdded: "2025-05-10",
  },
  {
    id: 2,
    title: "Advanced Node.js",
    category: "Backend",
    difficulty: "Advanced",
    dateAdded: "2025-04-12",
  },
  {
    id: 3,
    title: "Intro to Django",
    category: "Programming",
    difficulty: "Beginner",
    dateAdded: "2025-03-08",
  },
  {
    id: 4,
    title: "Fullstack with MERN",
    category: "Web Development",
    difficulty: "Intermediate",
    dateAdded: "2025-05-01",
  },
  
   { id: 5, title: "UI/UX", category: "Programming", difficulty: "Beginner",  dateAdded: "2025-05-01" },
  { id: 6, title: "MYSQL for Beginners", category: "Programming", difficulty: "Beginner", dateAdded: "2025-04-25" },
  { id: 7, title: "Advanced Mongoose", category: "Programming", difficulty: "Advanced",  dateAdded: "2025-04-15" },
  { id: 8, title: "Python", category: "Backend", difficulty: "Beginner", dateAdded: "2025-03-10" },
  { id: 9, title: "Intermediate Python", category: "Backend", difficulty: "Intermediate",  dateAdded: "2025-03-20" },
  { id: 10, title: "Java Development", category: "Programming", difficulty: "Beginner",  dateAdded: "2025-03-01" },
  { id: 11, title: "MERN stack", category: "Web Development", difficulty: "Intermediate",  dateAdded: "2025-05-10" },
  { id: 12, title: "Docker", category: "Backend", difficulty: "Beginner", dateAdded: "2025-04-05" },
];

const difficultyRank = (level) => {
  const order = { Beginner: 1, Intermediate: 2, Advanced: 3 };
  return order[level] || 0;
};

const CourseList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [sortOption, setSortOption] = useState("newest");

  const filteredCourses = useMemo(() => {
    let result = [...mockCourses];

    if (searchTerm) {
      result = result.filter((course) =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      result = result.filter((course) => course.category === selectedCategory);
    }

    if (selectedDifficulty) {
      result = result.filter((course) => course.difficulty === selectedDifficulty);
    }

    result.sort((a, b) => {
      switch (sortOption) {
        case "title-asc":
          return a.title.localeCompare(b.title);
        case "title-desc":
          return b.title.localeCompare(a.title);
        case "newest":
          return new Date(b.dateAdded) - new Date(a.dateAdded);
        case "oldest":
          return new Date(a.dateAdded) - new Date(b.dateAdded);
        case "difficulty-asc":
          return difficultyRank(a.difficulty) - difficultyRank(b.difficulty);
        case "difficulty-desc":
          return difficultyRank(b.difficulty) - difficultyRank(a.difficulty);
        default:
          return 0;
      }
    });

    return result;
  }, [searchTerm, selectedCategory, selectedDifficulty, sortOption]);

  return (
    <div className="course-container">
      <h1 className="heading">Course Catalog</h1>

      <div className="controls">
        <input
          type="text"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Web Development">Web Development</option>
          <option value="Backend">Backend</option>
          <option value="Programming">Programming</option>
        </select>

        <select value={selectedDifficulty} onChange={(e) => setSelectedDifficulty(e.target.value)}>
          <option value="">All Difficulty</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>

        <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="title-asc">Title (A–Z)</option>
          <option value="title-desc">Title (Z–A)</option>
          <option value="difficulty-asc">Difficulty (Beginner → Advanced)</option>
          <option value="difficulty-desc">Difficulty (Advanced → Beginner)</option>
        </select>
      </div>

      <div className="course-grid">
        {filteredCourses.length === 0 ? (
          <p className="no-results">No courses found.</p>
        ) : (
          filteredCourses.map((course) => (
            <div key={course.id} className="course-card">
              <h2>{course.title}</h2>
              <p className="category">{course.category}</p>
              <p>Difficulty: {course.difficulty}</p>
              <p className="date">Added: {course.dateAdded}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CourseList;
