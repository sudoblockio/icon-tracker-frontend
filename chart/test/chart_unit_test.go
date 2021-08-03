package test

import (
	"path/filepath"
	"testing"

	corev1 "k8s.io/api/core/v1"

	"github.com/gruntwork-io/terratest/modules/helm"
)

func TestIconBlocksUnit(t *testing.T) {
	helmChartPath := ".."

	options := &helm.Options{
		ValuesFiles: []string{
			filepath.Join("..", "deployments", "test", "values.test.yaml"),
		},
	}

	// Run RenderTemplate to render the template and capture the output.
	output := helm.RenderTemplate(t, options, helmChartPath, "deployment-icon-blocks*", []string{"templates/deployment.yaml"})

	// Now we use kubernetes/client-go library to render the template output into the Pod struct.
	var pod corev1.Pod
	helm.UnmarshalK8SYaml(t, output, &pod)

	if pod.TypeMeta.Kind != "Deployment" {
		t.Fatalf("Failed to render service.")
	}
}
