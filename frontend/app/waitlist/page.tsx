import useGetUserCampaignReg from "@/hooks/campaignHooks/useGetRegisteredUsers";

const WaitList = () => {
  const { users, isError, isLoading } = useGetUserCampaignReg();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }
  return (
    <div>
      <h2>Registered Users</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            <p>Name: {user.name}</p>
            <p>Address: {user.user_address}</p>
            <p>Email: {user.email_address}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WaitList;
