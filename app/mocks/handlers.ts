// mocks/handlers.ts
import rest from 'msw/node';


export const handlers = [
  rest.get('/api/contacts/[email]', (req, res, ctx) => {
    const { email } = req.params;

    // Simulate a database response based on the email
    if (email === 'carlos@example.com') {
      return res(
        ctx.json({
          id: 17,
          name: 'Carlos C.',
          email: 'carlos@example.com',
          phone: '934-567-8901'
        }),
        ctx.status(200)
      );
    } else {
      return res(
        ctx.status(404),
        ctx.json({ error: "Contact not found" })
      );
    }
  })
];