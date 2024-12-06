// src/app/api/adminapproval/stream.ts

let clients: Array<ReadableStreamDefaultController<any>> = [];

const sendToClients = (data: any) => {
  clients.forEach((client) => {
    // Send the data to clients using SSE format
    client.enqueue(`data: ${JSON.stringify(data)}\n\n`);
  });
};

export async function GET(request: Request) {
  // Create a readable stream with an encoder controller
  const readableStream = new ReadableStream({
    start(controller) {
      // Add this client to the list of clients
      clients.push(controller);

      // Clean up when the connection is closed
      request.signal.addEventListener('abort', () => {
        clients = clients.filter((client) => client !== controller);
      });
    },
  });

  // Return the response with proper headers for SSE
  const response = new Response(readableStream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
      'Access-Control-Allow-Origin': '*',
    },
  });

  return response;
}
// Call this function when a book is added, approved, or deleted
export const notifyClients = (data: any) => {
  sendToClients(data);
};
