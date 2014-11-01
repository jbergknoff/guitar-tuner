self.onmessage = function(event)
{
	var timeseries = event.data.timeseries;
	var test_frequencies = event.data.test_frequencies;
	var sample_rate = event.data.sample_rate;
	var amplitudes = compute_correlations(timeseries, test_frequencies, sample_rate);
	self.postMessage({ "timeseries": timeseries, "frequency_amplitudes": amplitudes });
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
			var frequency = f.frequency;

			// Represent a complex number as a length-2 array [ real, imaginary ].
			var accumulator = [ 0, 0 ];
			for (var t = 0; t < timeseries.length; t++)
			{
				accumulator[0] += timeseries[t] * Math.cos(scale_factor * frequency * t);
				accumulator[1] += timeseries[t] * Math.sin(scale_factor * frequency * t);
			}

			return accumulator;
		}
	);

	return amplitudes;
}
