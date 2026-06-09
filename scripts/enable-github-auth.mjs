const supabaseUrl = "https://stdjuiikyrqlwbkzydlv.supabase.co";
const anonKey = "sb_publishable_UVzETegzjHIqbJGvRb4NKQ_lvi5A-TB";

async function main() {
  // Enable GitHub provider via Supabase management API
  const res = await fetch(`${supabaseUrl}/auth/v1/admin/providers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: anonKey,
      Authorization: `Bearer ${anonKey}`,
    },
    body: JSON.stringify({
      provider: "github",
      enabled: true,
      client_id: "Ov23liFp7O87TaqAey62",
      client_secret: "DhruvTiwari@290405",
    }),
  });

  console.log("Status:", res.status);
  const text = await res.text();
  console.log("Response:", text);
}

main().catch(console.error);
