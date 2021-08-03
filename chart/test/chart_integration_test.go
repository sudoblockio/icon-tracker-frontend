package test

import (
	"fmt"
	"path/filepath"
	"strings"
	"testing"
	"time"

	"github.com/gruntwork-io/terratest/modules/helm"
	http_helper "github.com/gruntwork-io/terratest/modules/http-helper"
	"github.com/gruntwork-io/terratest/modules/k8s"
	"github.com/gruntwork-io/terratest/modules/random"
)

func TestPodDeploysContainerImage(t *testing.T) {
	helmChartPath := ".."

	options := &helm.Options{
		ValuesFiles: []string{
			filepath.Join("..", "deployments", "test", "values.test.yaml"),
		},
	}

	kubectlOptions := k8s.NewKubectlOptions("", "", "default")
	releaseName := fmt.Sprintf("prep-node-%s", strings.ToLower(random.UniqueId()))
	defer helm.Delete(t, options, releaseName, true)
	// Just test that it deploys - Takes to long to test endpoints
	// TODO Find env vars to skip fast sync
	helm.Install(t, options, helmChartPath, releaseName)

	podName := fmt.Sprintf("%s-0", releaseName)
	verifyBlocksEndpoint(t, kubectlOptions, podName)
}

// verifyBlocksEndpoint will open a tunnel to the Pod and hit the endpoint to verify the node is in BlockSync state
func verifyBlocksEndpoint(t *testing.T, kubectlOptions *k8s.KubectlOptions, podName string) {
	// Wait for the pod to come up. It takes some time for the Pod to start, so retry a few times.
	retries := 30
	sleep := 5 * time.Second
	k8s.WaitUntilPodAvailable(t, kubectlOptions, podName, retries, sleep)

	// Open a tunnel to the pod, making sure to close it at the end of the test.
	tunnel := k8s.NewTunnel(kubectlOptions, k8s.ResourceTypePod, podName, 0, 9000)
	defer tunnel.Close()
	tunnel.ForwardPort(t)

	endpoint := fmt.Sprintf("http://%s/api/v1/blocks", tunnel.Endpoint())
	http_helper.HttpGetWithRetryWithCustomValidation(
		t,
		endpoint,
		nil,
		retries,
		sleep,
		func(statusCode int, body string) bool {
			return statusCode == 200 && strings.Contains(body, "block_height")
		},
	)
}
