const filter = (text, filters, dataArg) => {
  let data = [...dataArg];

  if (data.length === 0) return data;

  Object.keys(filters).forEach((key) => {
    if (filters[key] && filters[key].length > 0) {
      const vals = filters[key].map((item) => item.value);
      data = data.filter((item) => vals.indexOf(item[key]) > -1);
    }
  });

  if (text) {
    data = data.filter((item) => {
      if (item.request_id.indexOf(text) > -1) return true;
      if (item.user && item.user.title && item.user.title.indexOf(text) > -1)
        return true;
      if (
        item.authorizer &&
        item.authorizer.title &&
        item.authorizer.title.indexOf(text) > -1
      )
        return true;
      if (item.assignee && item.assignee.indexOf(text) > -1) return true;
      if (item.title && item.title.indexOf(text) > -1) return true;
      if (item.reason && item.reason.indexOf(text) > -1) return true;
      return false;
    });
  }

  return data;
};

export { filter };
