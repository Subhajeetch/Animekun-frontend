import Form from "./Form.jsx";

export default function BugReportPage() {
  return (
    <main className="min-h-screen bg-backgroundtwo p-4 md:px-[54px]">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-center">🐞 Report a Bug</h1>

        <p className="text-center">
          If anything is not working properly for you, any buttons or if
          something seems missing or any error, be sure to report to us. We'll
          try super hard to fix it as soon as possible.
        </p>
      </div>

      <Form />
    </main>
  );
}
