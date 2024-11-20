import { getServerSession } from 'next-auth';
import { Container } from 'react-bootstrap';
import { adminProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';

const SellPage = async () => {
  const session = await getServerSession(authOptions);
  adminProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );
  return (
    <main>
      <Container id="list" fluid className="py-3">
        This is the sell page
      </Container>
    </main>
  );
};

export default SellPage;
