const SubmittedAssignment = ({ assign }) => {
  return (
    <tr>
      <td className="font-medium text-surface-900">{assign?.title}</td>
      <td>
        <p className="text-xs text-surface-500 max-w-[200px] truncate">{assign?.description}</p>
      </td>
      <td>
        {assign?.status === 'active' ? (
          <span className="badge-success">Active</span>
        ) : (
          <span className="badge-danger">Expired</span>
        )}
      </td>
      <td className="text-surface-500">{assign?.assignedAt}</td>
      <td className="text-surface-500">{assign?.deadline}</td>
      <td>
        <span className="text-xs font-medium px-3 py-1.5 rounded-lg bg-surface-100 text-surface-600">
          {assign?.submissionCount || assign?.submittedBy?.length || 0} submitted
        </span>
      </td>
    </tr>
  );
};

export default SubmittedAssignment;
