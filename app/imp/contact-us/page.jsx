import Form from "./Form.jsx";

export default function BugReportPage() {
  return (
    <main className="min-h-screen bg-backgroundtwo p-4 md:px-[54px]">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-center">Contact Us</h1>

        <p className="text-center">
          You can contact us about any queries. If you want to add new content, any request regarding new features, any partnership queries or business related queries, be sure to let us know.
        </p>
      </div>
      <Form />
    </main>
  );
}
