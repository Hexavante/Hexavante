import { getApiSession } from "@/lib/auth-session";
import { SocialFeed } from "@/components/social/social-feed";
import { getSocialFeed } from "@/services/social.service";
import { canModerate } from "@/lib/permissions";
import { PageShell } from "@/components/ui/page-shell";

type Props = {
  searchParams: Promise<{ tag?: string; post?: string }>;
};

export default async function SocialPage({ searchParams }: Props) {
  const { tag, post } = await searchParams;
  const session = await getApiSession();
  const viewerId = session?.user?.id;

  const [exploreActivities, followingActivities] = await Promise.all([
    getSocialFeed("explore", viewerId, 30, tag),
    viewerId ? getSocialFeed("following", viewerId, 30, tag) : Promise.resolve([]),
  ]);

  return (
    <PageShell>
      <SocialFeed
        exploreActivities={exploreActivities}
        followingActivities={followingActivities}
        canInteract={!!viewerId}
        canModerate={viewerId ? canModerate(session?.user?.roles) : false}
        viewerId={viewerId}
        highlightPostId={post}
      />
    </PageShell>
  );
}
