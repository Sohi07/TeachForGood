import useScrollToTop from "./useScrollToTop";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SuccessStories = () => {
  useScrollToTop();

  const stories = [
    { id: 1, title: "📚 From Street to School", description: "Ramesh, once selling newspapers, is now enrolled in school and dreams of becoming a doctor." },
    { id: 2, title: "👩‍🎓 Empowering Girls through Education", description: "Aarti, a rural girl on the verge of dropping out, is now in college thanks to educational support." },
    { id: 3, title: "💻 Tech for Good: A Digital Transformation", description: "Rahul, a college dropout, found a new path through digital learning and now works as a software developer." },
    { id: 4, title: "🎨 Art as a Means of Expression", description: "Priya discovered her passion for art through an NGO program and now sells her paintings worldwide." },
    { id: 5, title: "🌍 Bridging the Education Gap", description: "Online learning resources helped children in remote villages continue their studies during the pandemic." },
    { id: 6, title: "📖 Literacy for All", description: "Elderly women in a small town learned to read and write, enabling them to become independent." },
    { id: 7, title: "🛠️ Skill Development for a Better Future", description: "Manoj, trained in carpentry by an NGO, now runs his own successful furniture business." },
    { id: 8, title: "🎤 Public Speaking Confidence Boost", description: "Shalini overcame her fear of speaking and now conducts motivational talks for students." },
    { id: 9, title: "🚀 A Step Towards STEM", description: "A science program inspired Ravi to pursue a career in space technology." },
    { id: 10, title: "🏆 From Volunteer to Leader", description: "Ankit started as a volunteer and now leads a team providing education to underprivileged children." },
    { id: 11, title: "🎶 Music for Change", description: "A music-based education program transformed the lives of slum children, bringing hope and opportunities." },
    { id: 12, title: "📚 Free Library Initiative", description: "A community-driven effort provided free books and study materials to students in need." },
    { id: 13, title: "🤝 The Power of Mentorship", description: "Guidance from volunteers helped young students choose the right career path." },
    { id: 14, title: "🔬 Science Beyond Textbooks", description: "Hands-on experiments and workshops made science fun and accessible for village kids." },
    { id: 15, title: "🏫 Night Schools for Working Kids", description: "Evening classes enabled child laborers to continue their education alongside their work." }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  return (
    <div className="container mt-4" style={{ paddingTop: '60px' }}>
      <h1 className="text-center mb-4 text-primary">🌟 Success Stories 🌟</h1>
      <Slider {...settings}>
        {stories.map((story) => (
          <div key={story.id} className="p-3">
            <div className="card shadow p-3 rounded bg-light border-0 h-100">
              <h5 className="text-dark fw-bold">{story.title}</h5>
              <p className="text-secondary">{story.description}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SuccessStories;


