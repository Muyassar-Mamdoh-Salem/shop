import { useRouteError, isRouteErrorResponse, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AdvancedErrorBoundary = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("Error details:", error);
    // يمكنك إضافة تسجيل الخطأ لخدمة مثل Sentry هنا
  }, [error]);

  const determineErrorMessage = () => {
    if (isRouteErrorResponse(error)) {
      return error.statusText || "خطأ في استجابة الخادم";
    }
    if (error instanceof TypeError && error.message.includes("fetch")) {
      return "فشل في الاتصال بالخادم. يرجى التحقق من اتصال الإنترنت.";
    }
    if (error instanceof Error) {
      return error.message;
    }
    return "حدث خطأ غير متوقع";
  };

  const handleRetry = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2 className="mt-3 text-xl font-bold text-gray-900">
            حدث خطأ في التطبيق
          </h2>
          <p className="mt-2 text-gray-600">{determineErrorMessage()}</p>
        </div>
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={handleRetry}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
          >
            إعادة المحاولة
          </button>
          <button
            onClick={handleGoHome}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none"
          >
            العودة للصفحة الرئيسية
          </button>
        </div>
        {process.env.NODE_ENV === "development" && (
          <details className="mt-6 text-sm text-gray-500">
            <summary>معلومات تقنية للتصحيح</summary>
            <pre className="mt-2 p-2 bg-gray-100 rounded overflow-x-auto">
              {JSON.stringify(error, null, 2)}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
};