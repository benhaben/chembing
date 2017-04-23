
//update
Tank.findById(id, function (err, tank) {
  if (err) return handleError(err);
  
  tank.size = 'large';
  tank.save(function (err) {
    if (err) return handleError(err);
    res.send(tank);
  });
});

//update direct 
Tank.update({ _id: id }, { $set: { size: 'large' }}, callback);