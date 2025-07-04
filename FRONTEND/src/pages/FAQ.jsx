import React from 'react';

const FAQ = () => {
  return (
    <div className="bg-white text-gray-800 min-h-screen mt-10 px-6 md:px-16 py-10">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">Frequently Asked Questions</h1>

      <div className="max-w-3xl mx-auto space-y-6">
        <details className="border border-gray-200 rounded-lg p-4">
          <summary className="cursor-pointer font-medium text-lg text-gray-800">How can I track my order?</summary>
          <p className="mt-2 text-gray-600">
            Once your order is shipped, you'll receive an email with a tracking link. You can also check your order status from the "My Orders" section in your profile.
          </p>
        </details>

        <details className="border border-gray-200 rounded-lg p-4">
          <summary className="cursor-pointer font-medium text-lg text-gray-800">What is your return policy?</summary>
          <p className="mt-2 text-gray-600">
            We offer a 7-day return window on all eligible products. Items must be unused and returned with original packaging.
          </p>
        </details>

        <details className="border border-gray-200 rounded-lg p-4">
          <summary className="cursor-pointer font-medium text-lg text-gray-800">Do you offer international shipping?</summary>
          <p className="mt-2 text-gray-600">
            Currently, we ship only within India. We're working on expanding our international services soon.
          </p>
        </details>

        <details className="border border-gray-200 rounded-lg p-4">
          <summary className="cursor-pointer font-medium text-lg text-gray-800">How do I cancel my order?</summary>
          <p className="mt-2 text-gray-600">
            You can cancel your order from the "My Orders" section before it is shipped. Once shipped, cancellation isn’t possible, but you may initiate a return after delivery.
          </p>
        </details>

        <details className="border border-gray-200 rounded-lg p-4">
          <summary className="cursor-pointer font-medium text-lg text-gray-800">What payment methods are accepted?</summary>
          <p className="mt-2 text-gray-600">
            We accept Credit/Debit Cards, UPI, Net Banking, and COD (Cash on Delivery) for eligible locations.
          </p>
        </details>
      </div>
    </div>
  );
};

export default FAQ;