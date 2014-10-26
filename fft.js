self.onmessage = function(event)
{
	var timeseries = event.data.timeseries;
	var test_frequencies = event.data.test_frequencies;
	var sample_rate = event.data.sample_rate;
	var amplitudes = compute_correlations(timeseries, test_frequencies);
	self.postMessage({ "time_series": event.data, "frequency_amplitudes": frequency_amplitudes });
};

function compute_correlations(timeseries, test_frequencies, sample_rate)
{
	// 2pi * frequency gives the appropriate period to sine.
	// timeseries index / sample_rate gives the appropriate time coordinate.
	var scale_factor = 2 * Math.PI / sample_rate;
	var amplitudes = test_frequencies.map
	(
		function(f)
		{
			var accumulator = [ 0, 0 ];
			for (var t = 0; t < time_series.length; t++)
			{
				accumulator[0] += time_series[t] * Math.cos(scale_factor * f * t);
				accumulator[1] += time_series[t] * Math.sin(scale_factor * f * t);
			}

			return accumulator;
		}
	);

	return amplitudes;
}
