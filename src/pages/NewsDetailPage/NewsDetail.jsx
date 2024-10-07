import { useLocation, useParams } from "react-router-dom";
import { Card, Tag, Typography } from "antd";

const { Title, Paragraph } = Typography;

const ArticleDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const article = location.state?.article; // Access the passed article from state

  console.log(`Displaying article ID: ${id}`);

  if (!article) {
    return <div className="text-center">Article not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="shadow-lg">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-64 object-cover mb-4"
        />
        <Title level={2} className="mb-2">
          {article.title}
        </Title>
        <Paragraph className="text-gray-600 mb-4">{article.summary}</Paragraph>
        <Paragraph className="text-gray-800">{article.content}</Paragraph>
        <div className="mt-4">
          <span className="font-semibold">Author:</span> {article.author}
        </div>
        <div className="mt-2">
          <span className="font-semibold">Published on:</span>{" "}
          {article.publishDate}
        </div>
        <div className="mt-2">
          <span className="font-semibold">Tags:</span>
          {article.tags.map((tag) => (
            <Tag key={tag} className="ml-1">
              {tag}
            </Tag>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ArticleDetail;
