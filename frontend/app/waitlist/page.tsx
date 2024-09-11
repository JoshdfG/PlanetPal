import useGetRegisteredUsers from "@/hooks/campaignHooks/useGetRegisteredUsers";

const WaitList = () => {
  const { list: registeredUsers } = useGetRegisteredUsers();

  return (
    <div>
      <h1>Registered Users</h1>
      <ul>
        {registeredUsers.map((user, index) => (
          <li key={index}>
            <p>Name: {user.name}</p>
            <p>User Address: {user.user_address}</p>
            <p>Email Address: {user.email_address}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WaitList;
