self.onmessage = function(event)
{
	var frequency_amplitudes = fourier_transform(event.data);
	self.postMessage({ "time_series": event.data, "frequency_amplitudes": frequency_amplitudes });
};

function fourier_transform(time_series)
{
	var scale_factor = 2 * Math.PI / time_series.length;
	var amplitudes = [];
	// TODO: cutting off k arbitrarily here. base this off of the length of the time series.
	for (var k = 0; k < 100; k++)
	{
		var accumulator = [ 0, 0 ];
		for (var t = 0; t < time_series.length; t++)
		{
			accumulator[0] += time_series[t] * Math.cos(scale_factor * k * t);
			accumulator[1] += time_series[t] * Math.sin(scale_factor * k * t);
		}

		amplitudes.push(accumulator);
	}

	return amplitudes;
}
